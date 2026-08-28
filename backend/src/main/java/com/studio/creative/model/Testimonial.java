package com.studio.creative.model;

public class Testimonial {
    private String id;
    private String quote;
    private String author;
    private String company;
    private int rotation;

    public Testimonial() {}

    public Testimonial(String id, String quote, String author, String company, int rotation) {
        this.id = id;
        this.quote = quote;
        this.author = author;
        this.company = company;
        this.rotation = rotation;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getQuote() { return quote; }
    public void setQuote(String quote) { this.quote = quote; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public int getRotation() { return rotation; }
    public void setRotation(int rotation) { this.rotation = rotation; }
}
