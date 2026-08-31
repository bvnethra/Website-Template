-- ============================================================
-- MediNova Supabase Database Schema Migration
-- Defines relational structure, indexes, and RLS security policies
-- ============================================================

-- ── Enable Necessary Extensions ──────────────────────────────
create extension if not exists "uuid-ossp";

-- ── 1. Profiles Table (Linked to Supabase Auth) ──────────────
create table public.profiles (
    id uuid references auth.users on delete cascade primary key,
    name text not null,
    phone text,
    avatar_url text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;

create policy "Allow public read access to profiles" on public.profiles
    for select using (true);

create policy "Allow users to update own profile" on public.profiles
    for update using (auth.uid() = id);

-- ── 2. Addresses Table ──────────────────────────────────────
create table public.addresses (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    label text not null default 'Home', -- Home, Office, Other
    full_name text not null,
    phone text not null,
    address_line1 text not null,
    address_line2 text,
    city text not null,
    state text not null,
    pincode text not null,
    is_default boolean default false not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.addresses enable row level security;

create policy "Users can view own addresses" on public.addresses
    for select using (auth.uid() = user_id);

create policy "Users can insert own addresses" on public.addresses
    for insert with check (auth.uid() = user_id);

create policy "Users can update own addresses" on public.addresses
    for update using (auth.uid() = user_id);

create policy "Users can delete own addresses" on public.addresses
    for delete using (auth.uid() = user_id);

-- ── 3. Categories Table ─────────────────────────────────────
create table public.categories (
    id uuid default uuid_generate_v4() primary key,
    slug text unique not null,
    name text not null,
    description text,
    icon text, -- Lucide identifier
    color text, -- CSS styling variable/class
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.categories enable row level security;

create policy "Public read access to categories" on public.categories
    for select using (true);

-- ── 4. Products Table ──────────────────────────────────────
create table public.products (
    id uuid default uuid_generate_v4() primary key,
    slug text unique not null,
    name text not null,
    generic_name text,
    brand text not null,
    category_id uuid references public.categories(id) on delete set null,
    short_description text,
    description text,
    form text not null, -- tablet, capsule, syrup, etc.
    strength text,
    pack_size text not null,
    mrp numeric not null,
    sale_price numeric not null,
    discount numeric default 0 not null,
    rating numeric(2,1) default 5.0 not null,
    review_count integer default 0 not null,
    in_stock boolean default true not null,
    requires_prescription boolean default false not null,
    is_verified boolean default true not null,
    image_url text,
    manufacturer text not null,
    storage text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.products enable row level security;

create policy "Public read access to products" on public.products
    for select using (true);

-- ── 5. Orders Table ─────────────────────────────────────────
create type order_status as enum (
    'placed',
    'prescription_verified',
    'preparing',
    'packed',
    'out_for_delivery',
    'delivered',
    'cancelled'
);

create table public.orders (
    id uuid default uuid_generate_v4() primary key,
    order_number text unique not null,
    user_id uuid references public.profiles(id) on delete cascade not null,
    address_id uuid references public.addresses(id) on delete set null,
    subtotal numeric not null,
    discount numeric default 0 not null,
    delivery_fee numeric default 0 not null,
    total numeric not null,
    status order_status default 'placed'::order_status not null,
    payment_method text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.orders enable row level security;

create policy "Users can view own orders" on public.orders
    for select using (auth.uid() = user_id);

create policy "Users can insert own orders" on public.orders
    for insert with check (auth.uid() = user_id);

-- ── 6. Order Items Table ────────────────────────────────────
create table public.order_items (
    id uuid default uuid_generate_v4() primary key,
    order_id uuid references public.orders(id) on delete cascade not null,
    product_id uuid references public.products(id) on delete set null,
    quantity integer not null,
    price numeric not null
);

alter table public.order_items enable row level security;

create policy "Users can view own order items" on public.order_items
    for select using (
        exists (
            select 1 from public.orders
            where orders.id = order_items.order_id and orders.user_id = auth.uid()
        )
    );

-- ── 7. Prescriptions Table ──────────────────────────────────
create type prescription_status as enum (
    'uploaded',
    'processing',
    'verified',
    'rejected'
);

create table public.prescriptions (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    file_url text not null,
    file_name text not null,
    patient_name text not null,
    phone text not null,
    status prescription_status default 'uploaded'::prescription_status not null,
    notes text,
    uploaded_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.prescriptions enable row level security;

create policy "Users can view own prescriptions" on public.prescriptions
    for select using (auth.uid() = user_id);

create policy "Users can upload own prescriptions" on public.prescriptions
    for insert with check (auth.uid() = user_id);

-- ── 8. Lab Tests & Bookings ──────────────────────────────────
create table public.lab_tests (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    description text,
    mrp numeric not null,
    sale_price numeric not null,
    sample_type text not null,
    preparation text,
    report_time text not null,
    parameters_count integer not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.lab_tests enable row level security;

create policy "Public read access to lab tests" on public.lab_tests
    for select using (true);

create table public.lab_bookings (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    test_id uuid references public.lab_tests(id) on delete cascade not null,
    patient_name text not null,
    phone text not null,
    pincode text not null,
    collection_date date not null,
    collection_slot text not null,
    status text default 'booked' not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.lab_bookings enable row level security;

create policy "Users can view own lab bookings" on public.lab_bookings
    for select using (auth.uid() = user_id);

create policy "Users can insert own lab bookings" on public.lab_bookings
    for insert with check (auth.uid() = user_id);

-- ── 9. Doctors & Consultations ───────────────────────────────
create table public.doctors (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    specialty text not null,
    qualification text not null,
    experience integer not null,
    fee numeric not null,
    rating numeric(2,1) default 5.0 not null,
    languages text[] not null,
    is_available boolean default true not null
);

alter table public.doctors enable row level security;

create policy "Public read access to doctors" on public.doctors
    for select using (true);

create table public.doctor_consultations (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    doctor_id uuid references public.doctors(id) on delete cascade not null,
    patient_name text not null,
    phone text not null,
    consultation_date date not null,
    consultation_slot text not null,
    status text default 'scheduled' not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.doctor_consultations enable row level security;

create policy "Users can view own consultations" on public.doctor_consultations
    for select using (auth.uid() = user_id);

create policy "Users can book consultations" on public.doctor_consultations
    for insert with check (auth.uid() = user_id);

-- ── 10. Refill Reminders Table ────────────────────────────────
create table public.refill_reminders (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    medicine_name text not null,
    dosage text not null,
    schedule text,
    frequency_days integer default 30 not null,
    refill_date date not null,
    is_active boolean default true not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.refill_reminders enable row level security;

create policy "Users can view own reminders" on public.refill_reminders
    for select using (auth.uid() = user_id);

create policy "Users can insert own reminders" on public.refill_reminders
    for insert with check (auth.uid() = user_id);

create policy "Users can update own reminders" on public.refill_reminders
    for update using (auth.uid() = user_id);

create policy "Users can delete own reminders" on public.refill_reminders
    for delete using (auth.uid() = user_id);

-- ── Indexing for Performance optimization ───────────────────
create index idx_products_category on public.products(category_id);
create index idx_orders_user on public.orders(user_id);
create index idx_order_items_order on public.order_items(order_id);
create index idx_prescriptions_user on public.prescriptions(user_id);
create index idx_lab_bookings_user on public.lab_bookings(user_id);
create index idx_consultations_user on public.doctor_consultations(user_id);
create index idx_reminders_user on public.refill_reminders(user_id);
