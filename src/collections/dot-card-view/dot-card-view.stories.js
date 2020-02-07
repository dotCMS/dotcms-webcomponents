import readme from './readme.md';
export default {
    title: 'Collections',
    parameters: {
        notes: readme
    }
};
export const CardView = () => {
    const cardView = document.createElement('dot-card-view');
    cardView.items = [
        {
            data: {
                title: 'Hola Mundo'
            },
            actions: [
                {
                    label: 'Action 1',
                    action: (e) => {
                        console.log(e);
                    }
                },
                {
                    label: 'Action 2',
                    action: (e) => {
                        console.log(e);
                    }
                }
            ]
        },
        {
            data: {
                title: 'This is a very long text that we can use ellipsis',
                hasTitleImage: 'true',
                identifier: 'aaee9776-8fb7-4501-8048-844912a20405'
            }
        },
        {
            data: {
                title: 'File name'
            },
            actions: [
                {
                    label: 'Action 1',
                    action: (e) => {
                        console.log(e);
                    }
                },
                {
                    label: 'Action 2',
                    action: (e) => {
                        console.log(e);
                    }
                }
            ]
        },
        {
            data: {
                title: 'Hola Mundo'
            },
            actions: [
                {
                    label: 'Action 1',
                    action: (e) => {
                        console.log(e);
                    }
                },
                {
                    label: 'Action 2',
                    action: (e) => {
                        console.log(e);
                    }
                }
            ]
        },
        {
            data: {
                title: 'The Gas Price Rollercoaster',
                hasTitleImage: 'true',
                identifier: 'aaee9776-8fb7-4501-8048-844912a20405'
            }
        },
        {
            data: {
                title: 'File name'
            },
            actions: [
                {
                    label: 'Action 1',
                    action: (e) => {
                        console.log(e);
                    }
                },
                {
                    label: 'Action 2',
                    action: (e) => {
                        console.log(e);
                    }
                }
            ]
        },
        {
            data: {
                title: 'Hola Mundo'
            },
            actions: [
                {
                    label: 'Action 1',
                    action: (e) => {
                        console.log(e);
                    }
                },
                {
                    label: 'Action 2',
                    action: (e) => {
                        console.log(e);
                    }
                }
            ]
        },
        {
            data: {
                title: 'The Gas Price Rollercoaster',
                hasTitleImage: 'true',
                identifier: 'aaee9776-8fb7-4501-8048-844912a20405'
            }
        },
        {
            data: {
                title: 'File name'
            },
            actions: [
                {
                    label: 'Action 1',
                    action: (e) => {
                        console.log(e);
                    }
                },
                {
                    label: 'Action 2',
                    action: (e) => {
                        console.log(e);
                    }
                }
            ]
        },
        {
            data: {
                title: 'Hola Mundo'
            },
            actions: [
                {
                    label: 'Action 1',
                    action: (e) => {
                        console.log(e);
                    }
                },
                {
                    label: 'Action 2',
                    action: (e) => {
                        console.log(e);
                    }
                }
            ]
        },
        {
            data: {
                title: 'The Gas Price Rollercoaster',
                hasTitleImage: 'true',
                inode: 'aaee9776-8fb7-4501-8048-844912a20405'
            }
        },
        {
            data: {
                title: 'File name'
            },
            actions: [
                {
                    label: 'Action 1',
                    action: (e) => {
                        console.log(e);
                    }
                },
                {
                    label: 'Action 2',
                    action: (e) => {
                        console.log(e);
                    }
                }
            ]
        }
    ];

    return cardView;
};
