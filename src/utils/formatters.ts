export const dateFormat = (date: string | Date) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const datetimeFormat = (date: string | Date) => {
  const newDate = new Date(date);
  return newDate.toISOString();
};

export const urlBuilder = (value: string, type: string, siteUrl?: string) => {
  const afterLastSlash = value.split('/').pop()?.split('.')!;

  if (type === 'url') {
    return value;
  }
  if (type === 'page' || type === 'archive') {
    return `${siteUrl ? siteUrl : ''}/${afterLastSlash[0]}`;
  }
  if (type === 'work') {
    return `${siteUrl ? siteUrl : ''}/${type}/${afterLastSlash[0]}`;
  }
  if (type === 'person') {
    return `${siteUrl ? siteUrl : ''}/people/${afterLastSlash[0]}`;
  } else {
    return `${siteUrl ? siteUrl : ''}/${type}s/${afterLastSlash[0]}`;
  }
};

export const urlBuilderFromId = (
  id: string,
  type: string,
  siteUrl?: string
) => {
  // const afterLastSlash = value.split('/').pop()?.split('.')!;

  if (type === 'page' || type === 'archive') {
    return `${siteUrl ? siteUrl : ''}/${id}`;
  }
  if (type === 'work') {
    return `${siteUrl ? siteUrl : ''}/${type}/${id}`;
  }
  if (type === 'person') {
    return `${siteUrl ? siteUrl : ''}/people/${id}`;
  } else {
    return `${siteUrl ? siteUrl : ''}/${type}s/${id}`;
  }
};

export const currentPage = (path: string, link: string) => {
  const linkPath = link.split('/').pop()?.split('.')[0];
  const currentPath = path.split('/').pop();
  //console.log(currentPath, linkPath);
  return linkPath === currentPath ? 'page' : false;
};
