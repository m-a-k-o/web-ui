import { atom } from 'recoil';

const genderState = atom({
    key: 'gender',
    default: null,
    effects: [
        ({onSet}) => {
            onSet(gender => {
                window.mapsindoors?.MapsIndoors?.setUserRoles([gender === 'men' ? 'Men' : 'Woman'])
            });
        },
    ],
});

export default genderState;
