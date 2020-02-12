/**
 * 是否为移动端
 */
export const isMobile = () => {
  const u = navigator.userAgent;
  return !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/Mobile/g);
};
