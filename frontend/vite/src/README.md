# Frontend Architecture Guide

## Project Structure

```
src/
├── features/                    # Feature-based organization
│   ├── wallet/                  # Wallet functionality
│   │   ├── components/          # WalletContext, WalletProvider
│   │   ├── hooks/               # useWallet
│   │   ├── types/               # Wallet interfaces
│   │   └── index.ts             # Barrel exports
│   ├── technologies/            # Technology management
│   │   ├── components/          # TechForm, TechList, etc.
│   │   ├── types/               # Technology interfaces
│   │   └── index.ts
│   ├── contract/                # Smart contract integration
│   │   ├── components/          # ContractInfo
│   │   ├── hooks/               # useContract
│   │   ├── utils/               # Contract utilities
│   │   └── index.ts
│   └── index.ts                 # Main feature exports
├── components/
│   ├── layout/                  # Layout components (Navbar, Layout, etc.)
│   ├── ui/                      # Reusable UI components
│   └── index.ts
├── pages/
│   └── Home/
│       ├── sections/            # Page-specific components
│       └── Home.tsx
├── types/                       # Global TypeScript types
└── lib/                         # External library configurations
```

## Import Patterns

### Recommended Imports

```typescript
// Feature imports
import { useWallet, WalletProvider } from '@/features/wallet';
import { Technologies, AddTech } from '@/features/technologies';
import { ContractInfo, useContract } from '@/features/contract';

// Component imports
import { Layout, Navbar } from '@/components/layout';
import { Button, Card } from '@/components/ui';

// Type imports
import type { Technology, WalletState } from '@/types';
```

### Avoid These Patterns

```typescript
// Don't use relative imports for features
import { useWallet } from '../../features/wallet/hooks/useWallet';

// Don't import directly from specific paths when barrel exports exist
import { WalletProvider } from '@/features/wallet/components/WalletContext';
```

## Best Practices

### 1. Feature Organization

-   Keep related functionality together in feature folders
-   Use barrel exports (index.ts) for clean imports
-   Separate concerns: components, hooks, types, utils

### 2. Component Structure

-   Page components in `/pages`
-   Reusable components in `/components`
-   Feature-specific components in `/features/{feature}/components`

### 3. Type Management

-   Global types in `/types`
-   Feature-specific types in `/features/{feature}/types`
-   Use barrel exports for easy importing

### 4. Import Hierarchy

1. External libraries (React, etc.)
2. Internal features (`@/features/*`)
3. Internal components (`@/components/*`)
4. Internal types (`@/types/*`)
5. Relative imports (only when necessary)

## Path Mapping

Configured in `tsconfig.app.json`:

```json
{
    "paths": {
        "@/*": ["./src/*"],
        "@/components/*": ["./src/components/*"],
        "@/features/*": ["./src/features/*"],
        "@/pages/*": ["./src/pages/*"],
        "@/types/*": ["./src/types/*"]
    }
}
```

## Adding New Features

1. Create feature folder: `src/features/new-feature/`
2. Add subfolders: `components/`, `hooks/`, `types/`, `utils/`
3. Create barrel export: `index.ts`
4. Export from main features index: `src/features/index.ts`
5. Import using: `import { ... } from '@/features/new-feature';`

This structure promotes:

-   **Scalability**: Easy to add new features
-   **Maintainability**: Related code stays together
-   **Reusability**: Clear separation of concerns
-   **Team Collaboration**: Developers can work independently on features
