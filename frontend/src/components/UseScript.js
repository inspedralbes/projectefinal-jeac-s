import { useEffect } from 'react';

const useScript = (url, module) => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;

    if(module){
        script.type = ('module')
    }

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [url]);
};

export default useScript;