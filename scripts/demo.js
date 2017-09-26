(function () {
    function contentLoaded() {
        var container = document.getElementById('container'),
            txtAmount = document.getElementById('txtAmount'),
            btnChange = document.getElementById('btnChange'),
            boxAnimations = [];

        function init() {            
            btnChange.addEventListener('click', ()=>{
                clearBoxAnimations();
                container.innerHTML = '';
                createBoxesAnimation(txtAmount.value);
            });          
            animateContainer();
            createBoxesAnimation(20);
        }

        function animateContainer() {            
            container.animate({
                transform: [
                    'rotateX(75deg) rotateZ(0deg)',
                    'rotateX(75deg) rotateZ(360deg)'
                ]
            }, {
                duration: 10000,
                iterations: Infinity
            });

        }
       
        function createBoxesAnimation(sideCount) {
            var adjustment = (sideCount % 2) * 0.5;
            var min = -sideCount / 2 + adjustment;
            var max = sideCount / 2 + adjustment;

            for (var y = min; y < max; y++) {
                for (var x = min; x < max; x++) {
                    var box = createBox(sideCount),
                        animPointer = box.animate({
                            transform: [
                                'translateZ(0px)',
                                'translateZ(20px)'
                            ],
                            opacity: [1, 0]
                        }, {
                            delay: (x * x + y * y) * 20,
                            duration: 3000,
                            iterations: Infinity,
                            direction: 'alternate',
                            easing: 'ease-in'
                        });
                    boxAnimations.push(animPointer);
                }
            }
        }

        function createBox(sideCount) {
            var box = document.createElement('div');
            box.className = 'box';
            box.style.width = (100 / sideCount) + '%';
            box.style.height = (100 / sideCount) + '%';
            container.appendChild(box);
            return box;
        }

        function clearBoxAnimations() {
            boxAnimations.forEach(function (anim) {
                anim.cancel();
            });
        }

        init();
    }

    document.addEventListener('DOMContentLoaded', contentLoaded);
}());
