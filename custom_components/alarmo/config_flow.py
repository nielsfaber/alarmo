"""Config flow for the Alarmo component."""

import secrets

import voluptuous as vol
from homeassistant import config_entries
from homeassistant.core import callback

from .const import (
    NAME,
    DOMAIN,
    CONF_PUSH_ACTIONS_ENABLED,
    MAX_PUSH_ACTIONS_VALIDITY,
    CONF_PUSH_ACTIONS_VALIDITY,
    CONF_PUSH_ACTIONS_SKIP_CODE,
    CONF_PUSH_ACTIONS_ALLOW_UNVERIFIED,
)
from .push_actions import get_push_action_options


class AlarmoConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Config flow for Alarmo."""

    VERSION = "1.0.0"

    @staticmethod
    @callback
    def async_get_options_flow(config_entry):
        """Get the options flow for this handler."""
        return AlarmoOptionsFlow()

    async def async_step_user(self, user_input=None):
        """Handle a flow initialized by the user."""
        # Only a single instance of the integration
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")

        id = secrets.token_hex(6)

        await self.async_set_unique_id(id)
        self._abort_if_unique_id_configured(updates=user_input)

        return self.async_create_entry(title=NAME, data={})


class AlarmoOptionsFlow(config_entries.OptionsFlow):
    """Options for actionable push notifications."""

    async def async_step_init(self, user_input=None):
        """Manage the push action options."""
        if user_input is not None:
            return self.async_create_entry(data=user_input)

        options = get_push_action_options(self.config_entry)
        schema = vol.Schema(
            {
                vol.Required(
                    CONF_PUSH_ACTIONS_ENABLED,
                    default=options[CONF_PUSH_ACTIONS_ENABLED],
                ): bool,
                vol.Required(
                    CONF_PUSH_ACTIONS_SKIP_CODE,
                    default=options[CONF_PUSH_ACTIONS_SKIP_CODE],
                ): bool,
                vol.Required(
                    CONF_PUSH_ACTIONS_ALLOW_UNVERIFIED,
                    default=options[CONF_PUSH_ACTIONS_ALLOW_UNVERIFIED],
                ): bool,
                vol.Required(
                    CONF_PUSH_ACTIONS_VALIDITY,
                    default=options[CONF_PUSH_ACTIONS_VALIDITY],
                ): vol.All(
                    vol.Coerce(int), vol.Range(min=1, max=MAX_PUSH_ACTIONS_VALIDITY)
                ),
            }
        )
        return self.async_show_form(step_id="init", data_schema=schema)
