import { atom } from 'recoil';

const genderState = atom({
    key: 'gender',
    default: null,
    effects: [
        ({onSet}) => {
            onSet(gender => {
                window.mapsindoors.services.SolutionsService.getUserRoles().then(userRoles => {
                    const roles = userRoles.filter(role => gender.includes(role.name.toLowerCase()));
                    window.mapsindoors.MapsIndoors.setUserRoles(roles);
                });
            });
        },
    ],
});

export default genderState;
