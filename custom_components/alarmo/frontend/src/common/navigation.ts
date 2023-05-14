export interface Path {
  page: string;
  subpage?: string;
  params: Record<string, string | undefined>;
  filter?: Record<string, string | undefined>;
}

export const getPath = () => {
  const pairsToDict = (pairs: string[]) => {
    let res = {};
    for (let i = 0; i < pairs.length; i += 2) {
      const key = pairs[i];
      const val = i < pairs.length ? pairs[i + 1] : undefined;
      res = { ...res, [key]: val };
    }
    return res;
  };

  const parts = window.location.pathname.split('/');

  let path: Path = {
    page: parts[2] || 'general',
    params: {},
  };

  if (parts.length > 3) {
    let extraArgs = parts.slice(3);

    if (parts.includes('filter')) {
      const n = extraArgs.findIndex(e => e == 'filter');
      const filterParts = extraArgs.slice(n + 1);
      extraArgs = extraArgs.slice(0, n);

      path = { ...path, filter: pairsToDict(filterParts) };
    }

    if (extraArgs.length) {
      if (extraArgs.length % 2) path = { ...path, subpage: extraArgs.shift() };
      if (extraArgs.length) path = { ...path, params: pairsToDict(extraArgs) };
    }
  }
  return path;
};

export const exportPath = (
  page: string,
  ...args: (string | { params: Record<string, string> } | { filter: Record<string, string> })[]
) => {
  let path: Path = {
    page: page,
    params: {},
  };
  args.forEach(e => {
    if (typeof e == 'string') path = { ...path, subpage: e };
    else if ('params' in e) path = { ...path, params: e.params };
    else if ('filter' in e) path = { ...path, filter: e.filter };
  });

  const dictToString = (dict: Record<string, string | undefined>) => {
    let keys = Object.keys(dict);
    keys = keys.filter(e => dict[e]);
    keys.sort();
    let string = '';

    keys.forEach(key => {
      const val = dict[key];
      string = string.length ? `${string}/${key}/${val}` : `${key}/${val}`;
    });
    return string;
  };

  let url = `/alarmo/${path.page}`;

  if (path.subpage) url = `${url}/${path.subpage}`;
  if (dictToString(path.params).length) url = `${url}/${dictToString(path.params)}`;
  if (path.filter) url = `${url}/filter/${dictToString(path.filter)}`;

  return url;
};
