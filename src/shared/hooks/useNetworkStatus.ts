import { useEffect, useRef, useState } from 'react';

import NetInfo from '@react-native-community/netinfo';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner-native';

export function useNetworkStatus() {
  const { t } = useTranslation();
  const wasConnected = useRef(true);
  const [isConnected, setIsConnected] = useState(true);

  // Subscribe to connectivity changes; show toast on disconnect
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const connected = state.isConnected ?? true;

      if (!connected && wasConnected.current) {
        toast.error(t('error.noInternet'));
      }

      wasConnected.current = connected;
      setIsConnected(connected);
    });

    return unsubscribe;
  }, []);

  return { isConnected };
}
