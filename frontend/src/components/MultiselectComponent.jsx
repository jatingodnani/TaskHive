import React from 'react';
import Select from 'react-select';

// Transform the options to match the expected structure of react-select
const options = [
    {
        "_id": "66a4fc22e90acbedfc40d0dd",
        "fullname": "jatin",
        "email": "godnanijatin@gmail.com",
        "password": "801834ceec1541f230121feb0fb30b222816b9c9fc8da4d033e2636c3b152a08",
        "createdAt": "2024-07-27T13:54:42.223Z",
        "updatedAt": "2024-07-27T13:54:42.223Z",
        "salt":"�qt����>�3��ǻ�",
        "__v": 0
    },
    {
        "_id": "66a54b8716ffeb442f047e74",
        "fullname": "jatin",
        "email": "godnani122jatin@gmail.com",
        "password": "bd32c54f47f7c833875029a58a1d548daa7fb04def1573bb880d874dd68e41cb",
        "createdAt": "2024-07-27T19:33:27.271Z",
        "updatedAt": "2024-07-27T19:33:27.271Z",
        "salt":"�iywe�T�e��S��",
        "__v": 0
    },
    {
        "_id": "66a685088eab9be1433e2651",
        "fullname": "jatin",
        "email": "godnanijatin23@gmail.com",
        "password": "ebb32d5aba9952fa65b908e61926428343ba395b9c553542462d5e92f27a7c52",
        "createdAt": "2024-07-28T17:51:04.893Z",
        "updatedAt": "2024-07-28T17:51:04.893Z",
        "salt":"ߦ�ՠsl�*�v�J�",
        "__v": 0
    },
    {
        "_id": "66a6a35212d9d5a5d23d5217",
        "fullname": "Hehe",
        "email": "godnanijatin78899@gmail.com",
        "password": "bd3fe97b31408708a11b49055fafa1a4a1c1d993d662ec3cfe4e9795e6e27d45",
        "createdAt": "2024-07-28T20:00:18.089Z",
        "updatedAt": "2024-07-28T20:00:18.089Z",
        "salt":"Ҽ��\b�/�\b==���",
        "__v": 0
    },
    {
        "_id": "66a6a3dfd5d35118e5ad0c47",
        "fullname": "Hehe",
        "email": "godnanijatin7884599@gmail.com",
        "password": "78fd39164742501360098a87b9c42b9e74c690be957e3d3499cf1b1d47dd6552",
        "createdAt": "2024-07-28T20:02:39.661Z",
        "updatedAt": "2024-07-28T20:02:39.661Z",
        "salt":"%��������e\f�rj�",
        "__v": 0
    },
    {
        "_id": "66a6a42cd5d35118e5ad0c49",
        "fullname": "Hehe",
        "email": "godnanijatin78784599@gmail.com",
        "password": "9026df6ca9d0319ddad4792de739a6837ae643ceb9bd5228a9fd5038d6b3cdf8",
        "createdAt": "2024-07-28T20:03:56.530Z",
        "updatedAt": "2024-07-28T20:03:56.530Z",
        "salt": "s0�R����,\t3�\\hW�",
        "__v": 0
    },
    {
        "_id": "66a6a8dbd5d35118e5ad0c4c",
        "fullname": "jatin",
        "email": "godnanijatin75894@gmail.com",
        "password": "3be1748b1f81967cac08b79a9d8105de85bc7a52983718c48a95c567a2189109",
        "createdAt": "2024-07-28T20:23:55.448Z",
        "updatedAt": "2024-07-28T20:23:55.448Z",
        "salt": "�o��\n�z��\t�.�r�7",
        "__v": 0
    }
];

// Transform the options to match the expected structure of react-select
const transformedOptions = options.map(user => ({
    value: user._id,
    label: user.email
}));

export default function Multiselect() {
    return (
        <Select
            isMulti
            name="users"
            options={transformedOptions}
            className="basic-multi-select"
            classNamePrefix="select"
        />
    );
}
