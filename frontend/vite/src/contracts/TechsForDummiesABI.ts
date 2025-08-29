export const TechsForDummiesABI = [
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
                        name: 'adopters',
                        type: 'uint32',
                    },
                ],
                internalType: 'struct TechsForDummies.Tech',
                name: 'newTech',
                type: 'tuple',
            },
        ],
        name: 'addTech',
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
                        name: 'adopters',
                        type: 'uint32',
                    },
                ],
                internalType: 'struct TechsForDummies.Tech',
                name: 'newTech',
                type: 'tuple',
            },
        ],
        name: 'editTech',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'uint32', name: 'id', type: 'uint32' }],
        name: 'removeTech',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'uint32', name: '', type: 'uint32' }],
        name: 'techs',
        outputs: [
            { internalType: 'string', name: 'name', type: 'string' },
            { internalType: 'string', name: 'description', type: 'string' },
            { internalType: 'uint32', name: 'adopters', type: 'uint32' },
        ],
        stateMutability: 'view',
        type: 'function',
    },
];
