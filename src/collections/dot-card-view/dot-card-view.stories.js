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
                title: 'The Gas Price Rollercoaster',
                hasTitleImage: 'true',
                inode: 'c68db8ec-b523-41b7-82bd-fcb7533d3cfa'
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
                inode: 'c68db8ec-b523-41b7-82bd-fcb7533d3cfa'
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
                inode: 'c68db8ec-b523-41b7-82bd-fcb7533d3cfa'
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
                inode: 'c68db8ec-b523-41b7-82bd-fcb7533d3cfa'
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
