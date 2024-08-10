
const useUrl = () => {
    const protocol = new URL(window.location.href).protocol;
    const host = new URL(window.location.href).host;
    const url = `${protocol}//${host}`;
    const pathName = location.pathname;
    const fullAddress = `${url}${pathName}`;

    return { url, pathName, fullAddress };
};

export default useUrl;