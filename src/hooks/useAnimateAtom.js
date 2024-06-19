import { useInView } from 'react-intersection-observer';

const useAnimateView = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return [ref, inView];
};

export default useAnimateView;
