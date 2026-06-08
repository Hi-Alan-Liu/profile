/*======================================================
  Custom enhancements (added on top of the template)
  - scroll reveal
  - typing subtitle
  - portfolio show-more toggle
  Vanilla JS, no extra dependencies.
======================================================*/
(function () {
    'use strict';

    /*--------------------------------------------------
      Scroll reveal via IntersectionObserver
    --------------------------------------------------*/
    var revealSelectors = [
        '#about .about-content',
        '#skill .single-skill',
        '#experience .col.py-2',
        '#work .single-work',
        '.section-title'
    ];

    var els = [];
    revealSelectors.forEach(function (sel) {
        document.querySelectorAll(sel).forEach(function (el) {
            // skip works that start collapsed; they reveal on toggle
            if (el.closest('.work-hidden')) { return; }
            els.push(el);
        });
    });

    if ('IntersectionObserver' in window) {
        els.forEach(function (el, i) {
            el.classList.add('reveal');
            // small stagger within each row of three
            el.style.transitionDelay = (Math.min(i % 3, 2) * 0.08) + 's';
        });

        var io = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        els.forEach(function (el) { io.observe(el); });
    }

    /*--------------------------------------------------
      Typing subtitle (cycles through roles)
    --------------------------------------------------*/
    var typedEl = document.getElementById('typed-roles');
    if (typedEl) {
        var roles = ['Full-Stack Engineer', '全端工程師', 'Cat Lover 🐈', 'Maker'];
        var rIdx = 0;
        var cIdx = 0;
        var deleting = false;

        var cursor = document.createElement('span');
        cursor.className = 'typed-cursor';
        typedEl.parentNode.insertBefore(cursor, typedEl.nextSibling);

        function tick() {
            var word = roles[rIdx];

            if (!deleting) {
                cIdx++;
                typedEl.textContent = word.slice(0, cIdx);
                if (cIdx === word.length) {
                    deleting = true;
                    return setTimeout(tick, 1500);
                }
            } else {
                cIdx--;
                typedEl.textContent = word.slice(0, cIdx);
                if (cIdx === 0) {
                    deleting = false;
                    rIdx = (rIdx + 1) % roles.length;
                    return setTimeout(tick, 350);
                }
            }
            setTimeout(tick, deleting ? 55 : 110);
        }

        tick();
    }

    /*--------------------------------------------------
      Portfolio show-more toggle
    --------------------------------------------------*/
    var toggleBtn = document.getElementById('work-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function (e) {
            e.preventDefault();
            var expanded = toggleBtn.getAttribute('data-expanded') === 'true';
            var hidden = document.querySelectorAll('.work-hidden');

            hidden.forEach(function (el) {
                if (expanded) {
                    el.classList.remove('show-anim');
                    el.style.display = '';
                } else {
                    el.classList.add('show-anim');
                }
            });

            toggleBtn.setAttribute('data-expanded', expanded ? 'false' : 'true');
            toggleBtn.textContent = expanded ? '顯示全部作品' : '收起作品';
        });
    }
})();
