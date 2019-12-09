(function(doc, win) {
  const docEl = doc.documentElement;
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  const recalc = function() {
    const { clientWidth } = docEl;
    if (!clientWidth) {
      return;
    }

    if (clientWidth > 900) {
			docEl.style.fontSize = `${16 * (clientWidth / 1360)}px`;
    } else {
      docEl.style.fontSize = `${16 * (clientWidth / 375)}px`;
    }
  };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
}(document, window));
