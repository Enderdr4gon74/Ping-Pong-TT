class MorphingCubeService {
  hasClassName(inElement, inClassName) {
    var regExp = new RegExp('(?:^|\\s+)' + inClassName + '(?:\\s+|$)');
    return regExp.test(inElement.className);
  }

  addClassName(inElement, inClassName) {
    if (!hasClassName(inElement, inClassName))
      inElement.className = [inElement.className, inClassName].join(' ');
  }

  removeClassName(inElement, inClassName) {
    if (hasClassName(inElement, inClassName)) {
      var regExp = new RegExp('(?:^|\\s+)' + inClassName + '(?:\\s+|$)', 'g');
      var curClasses = inElement.className;
      inElement.className = curClasses.replace(regExp, ' ');
    }
  }

  toggleClassName(inElement, inClassName) {
    if (hasClassName(inElement, inClassName))
      removeClassName(inElement, inClassName);
    else
      addClassName(inElement, inClassName);
  }

  toggleShape() {
    var shape = document.getElementById('shape');
    if (hasClassName(shape, 'ring')) {
      removeClassName(shape, 'ring');
      addClassName(shape, 'cube');
    } else {
      removeClassName(shape, 'cube');
      addClassName(shape, 'ring');
    }

    // Move the ring back in Z so it's not so in-your-face.
    var stage = document.getElementById('stage');
    if (hasClassName(shape, 'ring'))
      stage.style.webkitTransform = 'translateZ(-200px)';
    else
      stage.style.webkitTransform = '';
  }

  toggleBackfaces() {
    var backfacesVisible = document.getElementById('backfaces').checked;
    var shape = document.getElementById('shape');
    if (backfacesVisible)
      addClassName(shape, 'backfaces');
    else
      removeClassName(shape, 'backfaces');
  }

}

export const morphCubeService = new MorphingCubeService()