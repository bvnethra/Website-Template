const fs = require('fs');
const path = require('path');

// Test how Location.prototype.pathname patch works
const patchScript = `
    <!-- Client-Side Routing & Mock API Interceptor -->
    <script>
      (function() {
        // SPA Subfolder Pathname Normalizer for React Router
        try {
          const origGetter = Object.getOwnPropertyDescriptor(Location.prototype, 'pathname').get;
          const templateBase = window.location.href.match(/(\\/templates\\/[^\\/]+\\/[^\\/]+)/)?.[1];
          
          if (templateBase) {
            Object.defineProperty(Location.prototype, 'pathname', {
              get: function() {
                let p = origGetter.call(this);
                if (p.startsWith(templateBase)) {
                  p = p.slice(templateBase.length);
                  if (!p || !p.startsWith('/')) p = '/' + p;
                }
                return p;
              },
              configurable: true
            });
          }
        } catch (e) {
          console.warn('Pathname override error:', e);
        }
      })();
    </script>
`;

console.log('Location.prototype patch script created:');
console.log(patchScript);
