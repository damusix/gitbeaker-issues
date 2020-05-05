const { ProjectsBundle } = require('@gitbeaker/node');

const services = new ProjectsBundle({
  token: process.env.TOKEN
});


setInterval(() => console.log(new Date()), 1000);

(async () => {

    const { data } = await services.Projects.all({
        perPage:1,
        maxPages:1,
        showExpanded: true,
        // owned: true,
        membership: true
    });

    console.log(data);
})();