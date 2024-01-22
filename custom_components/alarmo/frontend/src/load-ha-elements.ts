export const loadHaForm = async () => {

  if (customElements.get('ha-checkbox') && customElements.get('ha-slider') && !customElements.get('ha-panel-config')) return;
  await customElements.whenDefined('partial-panel-resolver');
  const ppr = document.createElement('partial-panel-resolver') as any;
  ppr.hass = {
    panels: [
      {
        url_path: 'tmp',
        component_name: 'config',
      },
    ],
  };
  ppr._updateRoutes();
  await ppr.routerOptions.routes.tmp.load();

  await customElements.whenDefined('ha-panel-config');

  const cpr = document.createElement('ha-panel-config') as any;
  await cpr.routerOptions.routes.automation.load();
};

export const loadHaYamlEditor = async () => {
  if (customElements.get('ha-yaml-editor')) return;

  // Load in ha-yaml-editor from developer-tools-service
  const ppResolver = document.createElement('partial-panel-resolver');
  const routes = (ppResolver as any).getRoutes([
    {
      component_name: 'developer-tools',
      url_path: 'a',
    },
  ]);
  await routes?.routes?.a?.load?.();
  const devToolsRouter = document.createElement('developer-tools-router');
  await (devToolsRouter as any)?.routerOptions?.routes?.service?.load?.();
};
