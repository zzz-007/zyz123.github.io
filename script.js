// 初始化炫酷动态效果
document.addEventListener('DOMContentLoaded', function() {
    // 设置渐变画布
    initGradientCanvas();
    
    // 初始化滚动动画
    initScrollAnimations();
    
    // 初始化技能进度条
    initSkillBars();
    
    // 初始化数字计数器
    initCounters();
    
    // 初始化导航菜单
    initNavigation();
    
    // 初始化表单交互
    initFormValidation();
    
    // 初始化主题切换
    initThemeToggle();
    
    // 初始化视差效果
    initParallax();
});

// 渐变画布背景
function initGradientCanvas() {
    const canvas = document.getElementById('gradient-canvas');
    const ctx = canvas.getContext('2d');
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    let time = 0;
    
    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // 创建渐变颜色
    function createGradient() {
        const gradient = ctx.createRadialGradient(
            width / 2,
            height / 2,
            0,
            width / 2,
            height / 2,
            Math.max(width, height) / 2
        );
        
        const hue1 = (time / 10) % 360;
        const hue2 = (hue1 + 60) % 360;
        const hue3 = (hue2 + 60) % 360;
        
        gradient.addColorStop(0, `hsl(${hue1}, 70%, 60%)`);
        gradient.addColorStop(0.4, `hsl(${hue2}, 70%, 50%)`);
        gradient.addColorStop(0.8, `hsl(${hue3}, 70%, 40%)`);
        gradient.addColorStop(1, `hsl(${hue1}, 70%, 30%)`);
        
        return gradient;
    }
    
    // 动画循环
    function animate() {
        time += 0.5;
        
        ctx.fillStyle = createGradient();
        ctx.fillRect(0, 0, width, height);
        
        // 添加一些噪点纹理
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            if (Math.random() > 0.97) {
                data[i] = 255;
                data[i + 1] = 255;
                data[i + 2] = 255;
                data[i + 3] = Math.random() * 50;
            }
        }
        
        ctx.putImageData(imageData, 0, 0);
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// 滚动动画
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    document.querySelectorAll('.skill-card, .project-card, .info-card').forEach(el => {
        observer.observe(el);
    });
}

// 技能进度条动画
function initSkillBars() {
    const skillBars = document.querySelectorAll('.level-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-level') + '%';
                entry.target.style.width = width;
                
                // 更新百分比文本
                const percentageEl = entry.target.parentElement.nextElementSibling;
                if (percentageEl) {
                    let current = 0;
                    const target = parseInt(entry.target.getAttribute('data-level'));
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        percentageEl.textContent = Math.round(current) + '%';
                    }, 16);
                }
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// 数字计数器动画
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                let current = 0;
                const duration = 2000;
                const increment = target / (duration / 16);
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    entry.target.textContent = Math.round(current);
                }, 16);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// 导航菜单交互
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // 关闭移动端菜单
                if (navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    });
    
    // 导航栏滚动效果
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const navbar = document.querySelector('.navbar');
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(26, 26, 46, 0.98)';
            navbar.style.padding = '1rem 0';
        } else {
            navbar.style.background = 'rgba(26, 26, 46, 0.95)';
            navbar.style.padding = '1.5rem 0';
        }
        
        lastScroll = currentScroll;
    });
}

// 表单验证和交互
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 简单的表单验证
            const inputs = this.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff4757';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // 显示成功消息
                this.innerHTML = `
                    <div class="form-success">
                        <i class="fas fa-check-circle"></i>
                        <h3>消息发送成功！</h3>
                        <p>感谢您的留言，我会尽快回复您。</p>
                    </div>
                `;
                
                // 添加成功样式
                const style = document.createElement('style');
                style.textContent = `
                    .form-success {
                        text-align: center;
                        padding: 2rem;
                        color: var(--light);
                    }
                    
                    .form-success i {
                        font-size: 4rem;
                        color: #4ecdc4;
                        margin-bottom: 1rem;
                    }
                    
                    .form-success h3 {
                        font-size: 1.5rem;
                        margin-bottom: 1rem;
                    }
                `;
                document.head.appendChild(style);
            }
        });
        
        // 输入框焦点效果
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        });
    }
}

// 主题切换功能
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        
        if (document.body.classList.contains('light-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
}

// 视差效果
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.getAttribute('data-speed')) || 0.5;
            el.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
}

// 添加鼠标跟随效果
document.addEventListener('mousemove', (e) => {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-effect';
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    document.body.appendChild(cursor);
    
    setTimeout(() => {
        cursor.remove();
    }, 1000);
});

// 添加自定义光标样式
const style = document.createElement('style');
style.textContent = `
    .cursor-effect {
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #ff6b6b;
        border-radius: 50%;
        pointer-events: none;
        animation: cursorPulse 1s ease-out forwards;
        z-index: 9999;
    }
    
    @keyframes cursorPulse {
        0% {
            transform: scale(0.5);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .light-theme {
        --dark: #ffffff;
        --light: #1a1a2e;
        --gradient-1: linear-gradient(135deg, #667eea, #764ba2);
        --gradient-2: linear-gradient(135deg, #f093fb, #f5576c);
        --gradient-3: linear-gradient(135deg, #4facfe, #00f2fe);
    }
    
    .light-theme .navbar {
        background: rgba(255, 255, 255, 0.95);
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    
    .light-theme .nav-link {
        color: var(--light);
    }
    
    .light-theme .skill-card,
    .light-theme .project-card,
    .light-theme .info-card {
        background: rgba(255, 255, 255, 0.8);
        border-color: rgba(0, 0, 0, 0.1);
    }
    
    .light-theme .skill-card h3,
    .light-theme .project-content h3,
    .light-theme .info-content h4 {
        color: var(--light);
    }
    
    .light-theme .skill-card p,
    .light-theme .project-content p,
    .light-theme .info-content p {
        color: rgba(26, 26, 46, 0.7);
    }
`;
document.head.appendChild(style);
