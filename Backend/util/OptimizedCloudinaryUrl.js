const getOptimizedCloudinaryUrl = (originalUrl, options = {}) => {
    try {
      const url = new URL(originalUrl);
      const pathSegments = url.pathname.split('/');
  
      const uploadIndex = pathSegments.indexOf('upload');
  
      if (uploadIndex !== -1) {
        const transformationString = [
          options.width ? `w_${options.width}` : null,
          options.format ? `f_${options.format}` : null,
          options.quality ? `q_${options.quality}` : null
        ].filter(Boolean).join(',');
  
        pathSegments.splice(uploadIndex + 1, 0, transformationString);
      }
  
      url.pathname = pathSegments.join('/');
      return url.toString();
    } catch (err) {
      return originalUrl;
    }
  };

export default getOptimizedCloudinaryUrl;