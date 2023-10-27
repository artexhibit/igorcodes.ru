const links = {
    link1: {
        rel: "apple-touch-icon",
        type: "",
        sizes: "180x180",
        href: "./assets/images/favicon/apple-touch-icon.png",
    },
    link2: {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "./assets/images/favicon/favicon-32x32.png",
    },
    link3: {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "./assets/images/favicon/favicon-16x16.png",
    },
    manifest: {
        rel: "",
        type: "",
        sizes: "",
        href: "./assets/images/favicon/site.webmanifest",
    },
};

Object.values(links).forEach((link) => {
    const linkToAdd = document.createElement("link");
    linkToAdd.rel = link.rel;
    linkToAdd.type = link.type;
    linkToAdd.sizes = link.sizes;
    linkToAdd.href = link.href;

    document.head.appendChild(linkToAdd);
});
