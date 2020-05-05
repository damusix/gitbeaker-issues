const Axios = require('axios');
const QS = require('querystring');

const headers = {
  'Private-Token': process.env.TOKEN
};

const GroupMap = new Map();
const ProjectMap = new Map();

// Set config defaults when creating the instance
const api = Axios.create({
  baseURL: 'https://gitlab.com/api/v4',
  headers
});

const fetchGroups = async () => {

  const query = QS.encode({
    min_access_level: 20
  });

  const { data } = await api.get(`/groups?${query}`);

  data.forEach((group) => GroupMap.set(group.id, group));
}

const fetchProjects = async () => {

  const query = QS.encode({
    with_issues_enabled: true,
    with_merge_requests_enabled: true,
    archived: false
  });

  for (const id of GroupMap.keys()) {

    const { data } = await api.get(`/groups/${id}/projects?${query}`);

    data.forEach((project) => {
      project.group_id = id;
      ProjectMap.set(project.id, project);
    });
  }
};

(async () => {

  await fetchGroups();
  await fetchProjects();

  console.log(ProjectMap.size, 'projects')
})();