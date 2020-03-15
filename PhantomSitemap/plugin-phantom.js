phantom.addObserver("preCompile", async function(data) {
    let sitemapLinks = ["/"],
        domain = await phantom.getNRS(),
        content = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";

    data.documentGroups.forEach(documentGroup => {
        documentGroup.documents.forEach(document => {
            sitemapLinks.push(document.path);
        });
    });

    sitemapLinks.forEach(path => {
         content += "<url><loc>" + domain + path + "</loc></url>\n";
    });

    await phantom.updateFile("robots.txt", "User-agent: *\nAllow: /\n\nSitemap: safe://" + domain + "/sitemap.xml");
    return await phantom.updateFile("sitemap.xml", content);
});