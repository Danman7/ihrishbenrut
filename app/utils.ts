export const isPathActive = (
  currentPath: string,
  linkPath: string
): boolean => {
  return currentPath.startsWith(linkPath);
};

// Get all parent paths for a given path
export const getParentPaths = (path: string): string[] => {
  const segments = path.split("/").filter(Boolean);
  const paths: string[] = [];

  for (let i = 1; i <= segments.length; i++) {
    paths.push("/" + segments.slice(0, i).join("/"));
  }

  return paths;
};
