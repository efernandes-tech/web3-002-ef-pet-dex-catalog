export const PetDexCatalogABI = [
    { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
    {
        inputs: [
            {
                components: [
                    { internalType: 'string', name: 'name', type: 'string' },
                    {
                        internalType: 'string',
                        name: 'description',
                        type: 'string',
                    },
                    {
                        internalType: 'uint32',
                        name: 'yearBirth',
                        type: 'uint32',
                    },
                ],
                internalType: 'struct PetDexCatalog.Pet',
                name: 'newPet',
                type: 'tuple',
            },
        ],
        name: 'addPet',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'count',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'uint32', name: 'id', type: 'uint32' },
            {
                components: [
                    { internalType: 'string', name: 'name', type: 'string' },
                    {
                        internalType: 'string',
                        name: 'description',
                        type: 'string',
                    },
                    {
                        internalType: 'uint32',
                        name: 'yearBirth',
                        type: 'uint32',
                    },
                ],
                internalType: 'struct PetDexCatalog.Pet',
                name: 'newPet',
                type: 'tuple',
            },
        ],
        name: 'editPet',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'uint32', name: '', type: 'uint32' }],
        name: 'pets',
        outputs: [
            { internalType: 'string', name: 'name', type: 'string' },
            { internalType: 'string', name: 'description', type: 'string' },
            { internalType: 'uint32', name: 'yearBirth', type: 'uint32' },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'uint32', name: 'id', type: 'uint32' }],
        name: 'removePet',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
];
