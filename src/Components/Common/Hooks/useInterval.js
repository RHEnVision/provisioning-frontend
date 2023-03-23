import React from 'react';

const intervalGenerator = function* (intervalList) {
  for (const interval of intervalList) yield interval;
};

const useInterval = (list) => {
  const generatorRef = React.useRef(null);
  const savedList = React.useRef(list);
  const [currentInterval, setCurrentInterval] = React.useState();

  React.useEffect(() => {
    generatorRef.current = intervalGenerator(savedList.current);
  }, []);

  const nextInterval = () => {
    const nextValue = generatorRef.current.next().value;
    setCurrentInterval(nextValue === undefined ? false : nextValue);
    if (nextValue === undefined) return false;
    return nextValue;
  };
  return { nextInterval, currentInterval };
};

export default useInterval;
