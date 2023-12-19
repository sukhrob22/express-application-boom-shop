export default {
    ifequal(a, b, option) {
        if (a == b) {
            return option.fn(this);
            // agar to'g'ri bo'lsa funksiyani davom etir degani
        }
        return option.inverse(this);
        // yoki buni atmen qilamiz degani
    },

    getFullNameFirsCharacter(firstName, lastName) {
        return firstName.charAt(0) + lastName.charAt(0);
    },
};
