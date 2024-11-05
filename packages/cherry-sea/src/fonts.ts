const fallback = ['-apple-system', 'Segoe UI', 'roboto', 'noto sans', 'ubuntu', 'cantarell', 'helvetica neue'];

/**
 * @deprecated
 */
const fonts = {
  fallback,
  brand: ['Barlow', ...fallback],
  plain: ['Inter', ...fallback],
};

export { fonts };
