import React, { createContext, useContext, useState } from 'react';

export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun' | 'deno';

interface PackageManagerContextType {
  packageManager: PackageManager;
  setPackageManager: (pm: PackageManager) => void;
}

const PackageManagerContext = createContext<PackageManagerContextType>({
  packageManager: 'npm',
  setPackageManager: () => {},
});

export const PackageManagerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [packageManager, setPackageManagerState] = useState<PackageManager>(() => {
    const saved = localStorage.getItem('envboot-pm') as PackageManager;
    return saved || 'npm';
  });

  const setPackageManager = (pm: PackageManager) => {
    setPackageManagerState(pm);
    localStorage.setItem('envboot-pm', pm);
  };

  return (
    <PackageManagerContext.Provider value={{ packageManager, setPackageManager }}>
      {children}
    </PackageManagerContext.Provider>
  );
};

export const usePackageManager = () => useContext(PackageManagerContext);
