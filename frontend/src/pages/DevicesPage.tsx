import React, { useEffect } from 'react';

interface DevicesPageProps {

}

export const DevicesPage: React.FunctionComponent<DevicesPageProps> = () => {
  useEffect(() => {
    (
      async () => {
        await getCatPrintCharacteristic();
        tpPrint('asdf');
      }
    )()
  }, []);
  
  return (
    <>
    </>
  )
}
