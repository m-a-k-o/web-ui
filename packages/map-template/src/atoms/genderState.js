import { atom } from 'recoil';

const genderState = atom({
    key: 'gender',
    default: null
});

export default genderState;
