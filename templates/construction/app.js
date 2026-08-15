/**
 * AURASTRUCT - Architectural Digital Twin & Construction Showcase Engine
 * - Custom 3D Vector Math Projection Engine (Orthographic/Perspective)
 * - Mouse Drag-to-Rotate / Touch Sweep Orbit Controls
 * - Floor-by-floor concrete/glass assembly animation sweeps
 * - Interactive drafting coordinates crosshairs
 * - Cost calculations slider triggers
 */

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    init3DEngine();
    initScrollObserver();
    initStatsCounter();
    initPortfolioFilter();
    initCostCalculator();
    initContactForm();
    initProcessTimeline();
    initCardTilt();
    initTextScramble();
});

/* =========================================================================
   1. Navigation Header & Mobile Drawer
   ========================================================================= */
function initHeader() {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const header = document.querySelector('.header');

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Hamburger graphic transitions
            const spans = hamburger.querySelectorAll('span');
            if (mobileNav.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Header glassmorphic background scroll triggers
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
        } else {
            header.style.padding = '20px 0';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.92)';
            header.style.boxShadow = 'none';
        }
    });
}

/* =========================================================================
   2. 3D Mathematical Canvas Engine (Skyscraper Blueprint Viewer)
   ========================================================================= */
function init3DEngine() {
    const container = document.getElementById('hudCanvasContainer');
    const canvas = document.getElementById('hudCanvas');
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    let width = container.clientWidth;
    let height = container.clientHeight;

    canvas.width = width;
    canvas.height = height;

    // Responsive Canvas Resizing
    window.addEventListener('resize', () => {
        width = container.clientWidth;
        height = container.clientHeight;
        canvas.width = width;
        canvas.height = height;
    });

    // 3D Geometry Definition (6-Floor Glass Office Tower)
    const skyscraper = {
        floors: 6,
        baseSize: 68,
        floorGap: 40,
        craneAngle: 0
    };

    // 3D Engine State Variables
    let angleX = -0.35; // default Pitch
    let angleY = 0.6;   // default Yaw
    let targetAngleX = -0.35;
    let targetAngleY = 0.6;

    let explodeFactor = 0.0;
    let targetExplode = 0.0;
    
    let orbitMode = true;
    
    // Building creation assembly progress timer
    let assemblyTimer = 0;

    // Mouse drag handlers
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    // Drag-to-Rotate mouse binds
    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
        orbitMode = false;
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        
        targetAngleY += deltaX * 0.005;
        targetAngleX += deltaY * 0.005;
        
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Touch handlers for mobile
    container.addEventListener('touchstart', (e) => {
        if (e.touches.length === 0) return;
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
        orbitMode = false;
    });

    container.addEventListener('touchmove', (e) => {
        if (!isDragging || e.touches.length === 0) return;
        const deltaX = e.touches[0].clientX - prevMouseX;
        const deltaY = e.touches[0].clientY - prevMouseY;
        
        targetAngleY += deltaX * 0.005;
        targetAngleX += deltaY * 0.005;
        
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
    });

    container.addEventListener('touchend', () => {
        isDragging = false;
    });

    // Cursor Drafting Guideline Tracker variables
    let mouseX = -1;
    let mouseY = -1;

    container.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    container.addEventListener('mouseleave', () => {
        mouseX = -1;
        mouseY = -1;
    });

    // Controls Button Listeners
    const btnExplode = document.getElementById('btnExplode');
    const btnRebuild = document.getElementById('btnRebuild');

    if (btnExplode) {
        btnExplode.addEventListener('click', () => {
            targetExplode = targetExplode === 0 ? 2.2 : 0;
            btnExplode.classList.toggle('active', targetExplode > 0);
        });
    }

    if (btnRebuild) {
        btnRebuild.addEventListener('click', () => {
            assemblyTimer = 0; // Reset construction animation
        });
    }

    // 3D Point Projector (Orthographic coordinate mapping)
    function project3DPoint(x, y, z) {
        // Y-Rotation (Yaw)
        let cosY = Math.cos(angleY);
        let sinY = Math.sin(angleY);
        let x1 = x * cosY - z * sinY;
        let z1 = x * sinY + z * cosY;

        // X-Rotation (Pitch)
        let cosX = Math.cos(angleX);
        let sinX = Math.sin(angleX);
        let y2 = y * cosX - z1 * sinX;
        let z2 = y * sinX + z1 * cosX;

        // Perspective Focal mapping
        const distance = 400;
        const scale = distance / (distance + z2 + 100);
        
        const screenCenterX = width / 2;
        const screenCenterY = height * 0.52;

        return {
            x: screenCenterX + x1 * scale * 1.7,
            y: screenCenterY + y2 * scale * 1.7,
            depth: z2,
            visible: (distance + z2) > 0
        };
    }

    // Draw solid skyscraper floor block with window grids and side shading
    function drawSolidFloor(f, progress) {
        if (progress <= 0.01) return;

        const fGap = skyscraper.floorGap;
        const fYBase = -f * fGap;
        
        // Add vertical explosion separation along Y
        const explodeYOffset = f * fGap * explodeFactor * -0.55;
        const baseY = fYBase + explodeYOffset;
        
        // Size dimensions: tapers slightly at top
        const size = skyscraper.baseSize - (f * 5.5);
        const nextSize = skyscraper.baseSize - ((f + 1) * 5.5);
        const h = fGap * progress; // animated height

        // 3D corners relative to floor base
        // Bottom floor corners
        const p0 = { x: -size, y: baseY, z: -size };
        const p1 = { x: size, y: baseY, z: -size };
        const p2 = { x: size, y: baseY, z: size };
        const p3 = { x: -size, y: baseY, z: size };

        // Top floor corners
        const p4 = { x: -nextSize, y: baseY - h, z: -nextSize };
        const p5 = { x: nextSize, y: baseY - h, z: -nextSize };
        const p6 = { x: nextSize, y: baseY - h, z: nextSize };
        const p7 = { x: -nextSize, y: baseY - h, z: nextSize };

        // Project corners
        const s0 = project3DPoint(p0.x, p0.y, p0.z);
        const s1 = project3DPoint(p1.x, p1.y, p1.z);
        const s2 = project3DPoint(p2.x, p2.y, p2.z);
        const s3 = project3DPoint(p3.x, p3.y, p3.z);

        const s4 = project3DPoint(p4.x, p4.y, p4.z);
        const s5 = project3DPoint(p5.x, p5.y, p5.z);
        const s6 = project3DPoint(p6.x, p6.y, p6.z);
        const s7 = project3DPoint(p7.x, p7.y, p7.z);

        if (!s0.visible || !s1.visible || !s2.visible || !s3.visible ||
            !s4.visible || !s5.visible || !s6.visible || !s7.visible) return;

        // --- Dynamic Blueprint Colors ---
        const activeColorStr = '2, 132, 199'; // deep sky blue
        const nodeColorStr = '#0284c7';

        // --- Render Shaded Glass Facades (Translucent Solid Faces) ---
        
        // Left Side Face
        ctx.fillStyle = 'rgba(' + activeColorStr + ', 0.05)';
        ctx.beginPath();
        ctx.moveTo(s0.x, s0.y); ctx.lineTo(s3.x, s3.y); ctx.lineTo(s7.x, s7.y); ctx.lineTo(s4.x, s4.y);
        ctx.closePath(); ctx.fill();

        // Front Face
        ctx.fillStyle = 'rgba(' + activeColorStr + ', 0.12)';
        ctx.beginPath();
        ctx.moveTo(s3.x, s3.y); ctx.lineTo(s2.x, s2.y); ctx.lineTo(s6.x, s6.y); ctx.lineTo(s7.x, s7.y);
        ctx.closePath(); ctx.fill();

        // Right Side Face
        ctx.fillStyle = 'rgba(' + activeColorStr + ', 0.08)';
        ctx.beginPath();
        ctx.moveTo(s1.x, s1.y); ctx.lineTo(s2.x, s2.y); ctx.lineTo(s6.x, s6.y); ctx.lineTo(s5.x, s5.y);
        ctx.closePath(); ctx.fill();

        // Top Floor Slab Face
        ctx.fillStyle = 'rgba(' + activeColorStr + ', 0.18)';
        ctx.beginPath();
        ctx.moveTo(s4.x, s4.y); ctx.lineTo(s5.x, s5.y); ctx.lineTo(s6.x, s6.y); ctx.lineTo(s7.x, s7.y);
        ctx.closePath(); ctx.fill();

        // Draw structural window mullions
        ctx.strokeStyle = 'rgba(' + activeColorStr + ', 0.15)';
        ctx.lineWidth = 0.5;

        // Front wall window columns
        for (let i = 1; i <= 3; i++) {
            const ratio = i / 4;
            const startX = s3.x + (s2.x - s3.x) * ratio;
            const startY = s3.y + (s2.y - s3.y) * ratio;
            const endX = s7.x + (s6.x - s7.x) * ratio;
            const endY = s7.y + (s6.y - s7.y) * ratio;

            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        }

        // Horizontal floor bands
        ctx.beginPath();
        ctx.moveTo((s3.x + s7.x)/2, (s3.y + s7.y)/2);
        ctx.lineTo((s2.x + s6.x)/2, (s2.y + s6.y)/2);
        ctx.stroke();

        // --- Outer Structural Wireframes ---
        ctx.strokeStyle = 'rgba(' + activeColorStr + ', 0.5)';
        ctx.lineWidth = 1.0;

        // Draw top rim
        ctx.beginPath();
        ctx.moveTo(s4.x, s4.y); ctx.lineTo(s5.x, s5.y); ctx.lineTo(s6.x, s6.y); ctx.lineTo(s7.x, s7.y);
        ctx.closePath(); ctx.stroke();

        // Draw vertical columns
        const columns = [[s0, s4], [s1, s5], [s2, s6], [s3, s7]];
        columns.forEach(([start, end]) => {
            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
        });

        // Draw node joints
        ctx.fillStyle = nodeColorStr;
        [s4, s5, s6, s7].forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fill();
        });

        // --- Laser Constructor Scanning Effect ---
        if (progress > 0.05 && progress < 0.99) {
            ctx.strokeStyle = 'rgba(217, 119, 6, 0.9)'; // warm gold scanline
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(s4.x, s4.y); ctx.lineTo(s5.x, s5.y); ctx.lineTo(s6.x, s6.y); ctx.lineTo(s7.x, s7.y);
            ctx.closePath();
            ctx.stroke();
        }
    }

    // Draw Roof Crane Erection
    function drawRoofCrane() {
        const fGap = skyscraper.floorGap;
        const explodeYOffset = (skyscraper.floors - 1) * fGap * explodeFactor * -0.55;
        const baseY = -(skyscraper.floors - 1) * fGap + explodeYOffset - fGap;

        const size = skyscraper.baseSize - (skyscraper.floors * 5.5);
        
        // Pivot point at center of top floor
        const c0 = { x: 0, y: baseY, z: 0 };
        const sc0 = project3DPoint(c0.x, c0.y, c0.z);

        // Crane Tower (vertical post)
        const cTower = { x: 0, y: baseY - 24, z: 0 };
        const scTower = project3DPoint(cTower.x, cTower.y, cTower.z);

        if (sc0.visible && scTower.visible) {
            ctx.strokeStyle = 'rgba(194, 65, 12, 0.7)'; // gold steel
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(sc0.x, sc0.y);
            ctx.lineTo(scTower.x, scTower.y);
            ctx.stroke();

            // Rotate jib arm
            skyscraper.craneAngle += 0.015;
            const jibLength = 36;
            const jx = Math.cos(skyscraper.craneAngle) * jibLength;
            const jz = Math.sin(skyscraper.craneAngle) * jibLength;

            const cJib = { x: jx, y: baseY - 24, z: jz };
            const scJib = project3DPoint(cJib.x, cJib.y, cJib.z);

            const cCounterJib = { x: -jx * 0.4, y: baseY - 24, z: -jz * 0.4 };
            const scCounterJib = project3DPoint(cCounterJib.x, cCounterJib.y, cCounterJib.z);

            if (scJib.visible && scCounterJib.visible) {
                // Jib boom
                ctx.beginPath();
                ctx.moveTo(scCounterJib.x, scCounterJib.y);
                ctx.lineTo(scJib.x, scJib.y);
                ctx.stroke();

                // Hook cable drop
                const hookY = baseY - 24 + 14;
                const cHook = { x: jx * 0.85, y: hookY, z: jz * 0.85 };
                const scHook = project3DPoint(cHook.x, cHook.y, cHook.z);

                const cJibCableAnchor = { x: jx * 0.85, y: baseY - 24, z: jz * 0.85 };
                const scJibCableAnchor = project3DPoint(cJibCableAnchor.x, cJibCableAnchor.y, cJibCableAnchor.z);

                if (scHook.visible && scJibCableAnchor.visible) {
                    ctx.strokeStyle = 'rgba(15, 23, 42, 0.4)';
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(scJibCableAnchor.x, scJibCableAnchor.y);
                    ctx.lineTo(scHook.x, scHook.y);
                    ctx.stroke();
                }
            }
        }
    }

    // Particles Swarm
    const sparks = [];
    for(let i = 0; i < 20; i++) {
        sparks.push({
            x: (Math.random() - 0.5) * 150,
            y: -Math.random() * 220,
            z: (Math.random() - 0.5) * 150,
            speed: Math.random() * 0.4 + 0.2
        });
    }

    // Main 3D Render Loop
    function render() {
        angleX += (targetAngleX - angleX) * 0.1;
        angleY += (targetAngleY - angleY) * 0.1;
        explodeFactor += (targetExplode - explodeFactor) * 0.08;

        if (orbitMode && !isDragging) {
            targetAngleY += 0.003;
        }

        // Increment build timer
        assemblyTimer += 0.85;

        ctx.clearRect(0, 0, width, height);

        // Draw crosshairs drafting guidelines (HUD Cursor Tracker)
        if (mouseX >= 0 && mouseY >= 0) {
            ctx.strokeStyle = 'rgba(2, 132, 199, 0.15)';
            ctx.lineWidth = 1;
            ctx.setLineDash([2, 4]);
            
            ctx.beginPath();
            ctx.moveTo(0, mouseY); ctx.lineTo(width, mouseY);
            ctx.moveTo(mouseX, 0); ctx.lineTo(mouseX, height);
            ctx.stroke();
            ctx.setLineDash([]); // reset

            // Draw target reticle
            ctx.strokeStyle = 'rgba(2, 132, 199, 0.5)';
            ctx.beginPath();
            ctx.arc(mouseX, mouseY, 8, 0, Math.PI * 2);
            ctx.stroke();

            ctx.fillStyle = '#0284c7';
            ctx.beginPath();
            ctx.arc(mouseX, mouseY, 1.5, 0, Math.PI * 2);
            ctx.fill();

            // Text coordinates tag
            ctx.fillStyle = 'rgba(2, 132, 199, 0.75)';
            ctx.font = '9px monospace';
            ctx.fillText(`CURS_X: ${Math.round(mouseX)}px`, mouseX + 12, mouseY - 6);
            ctx.fillText(`CURS_Y: ${Math.round(mouseY)}px`, mouseX + 12, mouseY + 6);
        }

        // 1. Draw Blueprint Drafting Grid base
        ctx.strokeStyle = 'rgba(2, 132, 199, 0.06)';
        ctx.lineWidth = 1;
        const gridSpacing = 35;
        const gridLimit = 5;
        for (let i = -gridLimit; i <= gridLimit; i++) {
            const p1 = project3DPoint(-gridLimit * gridSpacing, 0, i * gridSpacing);
            const p2 = project3DPoint(gridLimit * gridSpacing, 0, i * gridSpacing);
            if (p1.visible && p2.visible) {
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }

            const p3 = project3DPoint(i * gridSpacing, 0, -gridLimit * gridSpacing);
            const p4 = project3DPoint(i * gridSpacing, 0, gridLimit * gridSpacing);
            if (p3.visible && p4.visible) {
                ctx.beginPath();
                ctx.moveTo(p3.x, p3.y);
                ctx.lineTo(p4.x, p4.y);
                ctx.stroke();
            }
        }

        // Draw solid concrete foundation ring
        const footS = skyscraper.baseSize + 5;
        const f0 = project3DPoint(-footS, 0, -footS);
        const f1 = project3DPoint(footS, 0, -footS);
        const f2 = project3DPoint(footS, 0, footS);
        const f3 = project3DPoint(-footS, 0, footS);
        if (f0.visible && f1.visible && f2.visible && f3.visible) {
            ctx.fillStyle = 'rgba(2, 132, 199, 0.04)';
            ctx.beginPath();
            ctx.moveTo(f0.x, f0.y); ctx.lineTo(f1.x, f1.y); ctx.lineTo(f2.x, f2.y); ctx.lineTo(f3.x, f3.y);
            ctx.closePath(); ctx.fill();
            ctx.strokeStyle = 'rgba(2, 132, 199, 0.25)';
            ctx.stroke();
        }

        // 2. Project Sparks
        const activeColorStr = '2, 132, 199';
        sparks.forEach(spark => {
            spark.y += spark.speed;
            if (spark.y > 10) spark.y = -220;

            const pos = project3DPoint(spark.x, spark.y, spark.z);
            if (pos.visible) {
                ctx.fillStyle = 'rgba(' + activeColorStr + ', ' + (0.12 + (1 - Math.abs(spark.y + 110)/110) * 0.4) + ')';
                ctx.beginPath();
                ctx.arc(pos.x, pos.y, 1.2, 0, Math.PI * 2);
                ctx.fill();
            }
        });

        // 3. Draw Solid floors sequentially (building animation)
        for (let f = 0; f < skyscraper.floors; f++) {
            const startFrame = f * 85;
            const progress = Math.min(1.0, Math.max(0.0, (assemblyTimer - startFrame) / 65));
            drawSolidFloor(f, progress);
        }

        // 4. Draw Roof-mounted construction crane
        const craneAssembleTrigger = (skyscraper.floors - 1) * 85;
        if (assemblyTimer > craneAssembleTrigger) {
            drawRoofCrane();
        }

        requestAnimationFrame(render);
    }

    render();
}

/* =========================================================================
   3. Scroll Reveal Handler (Fade-ins)
   ========================================================================= */
function initScrollObserver() {
    const revealElements = document.querySelectorAll('.section, .about-img-frame, .about-text-content, .service-card, .portfolio-item, .review-card');
    
    // Add CSS reveal helper classes dynamically
    revealElements.forEach(el => {
        el.classList.add('reveal-item');
    });

    // CSS styling injected on load for reveal items
    const style = document.createElement('style');
    style.innerHTML = `
        .reveal-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .reveal-item.revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
}

/* =========================================================================
   4. Stats Counters Animation
   ========================================================================= */
function initStatsCounter() {
    const statNums = document.querySelectorAll('.stat-num');
    
    const observerOptions = {
        root: null,
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endVal = parseInt(target.getAttribute('data-target'), 10);
                const suffix = target.getAttribute('data-suffix') || '';
                animateValue(target, 0, endVal, 1600, suffix);
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    statNums.forEach(num => counterObserver.observe(num));
}

function animateValue(obj, start, end, duration, suffix) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start) + suffix;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

/* =========================================================================
   5. Portfolio Category Filter Tabs
   ========================================================================= */
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/* =========================================================================
   6. Real-Time HUD Cost Calculator
   ========================================================================= */
function initCostCalculator() {
    const calcForm = document.getElementById('quoteCalculator');
    if (!calcForm) return;

    const areaInput = document.getElementById('calcArea');
    const areaValueLabel = document.getElementById('calcAreaVal');
    const typeSelect = document.getElementById('calcType');
    const finishRadios = document.querySelectorAll('input[name="finish"]');
    const priceDisplay = document.getElementById('calcPriceResult');
    
    // Cost indexing rates
    const baseRates = {
        residential: 160,
        commercial: 250,
        industrial: 320
    };

    const finishCoefficients = {
        standard: 1.0,
        premium: 1.35,
        luxury: 1.75
    };

    function calculateEstimate() {
        const area = parseFloat(areaInput.value);
        const projectType = typeSelect.value;
        
        let finish = 'standard';
        finishRadios.forEach(radio => {
            if (radio.checked) finish = radio.value;
        });

        areaValueLabel.textContent = area.toLocaleString();

        const rate = baseRates[projectType] || baseRates.residential;
        const multiplier = finishCoefficients[finish] || 1.0;
        const estimatedCost = Math.round(area * rate * multiplier);

        priceDisplay.classList.add('price-update');
        priceDisplay.textContent = '$' + estimatedCost.toLocaleString();
        
        setTimeout(() => {
            priceDisplay.classList.remove('price-update');
        }, 150);
    }

    areaInput.addEventListener('input', calculateEstimate);
    typeSelect.addEventListener('change', calculateEstimate);
    finishRadios.forEach(radio => {
        radio.addEventListener('change', calculateEstimate);
    });

    // Run first calculation on load
    calculateEstimate();
}

/* =========================================================================
   7. Contact Form Success Triggers
   ========================================================================= */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const feedback = document.getElementById('formFeedback');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-satellite fa-spin"></i> TRANSMITTING DATA...';

        setTimeout(() => {
            feedback.style.display = 'block';
            feedback.textContent = 'DATA TRANSMISSION SECURE: Inquiry received successfully. Our engineering coordinators will review the blueprint parameters and follow up shortly.';
            
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            form.reset();

            const inputs = form.querySelectorAll('.form-input, .form-textarea');
            inputs.forEach(input => {
                input.placeholder = ' ';
            });

            feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            setTimeout(() => {
                feedback.style.display = 'none';
            }, 8000);
        }, 1500);
    });
}

/* =========================================================================
   8. Process Timeline Accordion
   ========================================================================= */
function initProcessTimeline() {
    const steps = document.querySelectorAll('.process-step');
    
    steps.forEach((step) => {
        const header = step.querySelector('.process-header');
        header.addEventListener('click', () => {
            if (step.classList.contains('active')) {
                step.classList.remove('active');
            } else {
                steps.forEach(s => s.classList.remove('active'));
                step.classList.add('active');
            }
        });
    });
}

/* =========================================================================
   9. Interactive 3D Card Tilting (Mouse Tracker)
   ========================================================================= */
function initCardTilt() {
    const cards = document.querySelectorAll('.calc-card, .contact-card, .service-card, .review-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            const angleX = (yc - y) / 20;
            const angleY = (x - xc) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-4px)`;
            card.style.boxShadow = `0 15px 30px rgba(15, 23, 42, 0.08)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
            card.style.boxShadow = '';
        });
    });
}

/* =========================================================================
   10. Character Cipher Text Scramble Animation
   ========================================================================= */
function scrambleText(el) {
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    const originalText = el.getAttribute('data-original-text') || el.innerText;
    if (!el.getAttribute('data-original-text')) {
        el.setAttribute('data-original-text', originalText);
    }
    
    let frame = 0;
    const queue = [];
    for (let i = 0; i < originalText.length; i++) {
        const from = el.innerText[i] || '';
        const to = originalText[i];
        const start = Math.floor(Math.random() * 15);
        const end = start + Math.floor(Math.random() * 20);
        queue.push({ from, to, start, end, char: '' });
    }
    
    let complete = 0;
    function update() {
        let output = '';
        complete = 0;
        for (let i = 0; i < queue.length; i++) {
            let { from, to, start, end, char } = queue[i];
            if (frame >= end) {
                complete++;
                output += to;
            } else if (frame >= start) {
                if (!char || Math.random() < 0.25) {
                    char = chars[Math.floor(Math.random() * chars.length)];
                    queue[i].char = char;
                }
                output += char;
            } else {
                output += from;
            }
        }
        el.innerText = output;
        if (complete < queue.length) {
            frame++;
            requestAnimationFrame(update);
        }
    }
    update();
}

function initTextScramble() {
    const scrambleElements = document.querySelectorAll('.scramble-text');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                scrambleText(entry.target);
            }
        });
    }, { threshold: 0.1 });

    scrambleElements.forEach(el => {
        observer.observe(el);
        
        el.addEventListener('mouseenter', () => {
            scrambleText(el);
        });
    });
}
