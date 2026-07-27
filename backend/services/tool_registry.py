import logging
from typing import Any, Callable

logger = logging.getLogger(__name__)


class ToolRegistry:
    def __init__(self) -> None:
        self._functions: dict[str, Callable] = {}

    def register(self, name: str) -> Callable:
        def decorator(func: Callable) -> Callable:
            self._functions[name] = func
            logger.debug("Registered tool: %s", name)
            return func
        return decorator

    def get(self, name: str) -> Callable | None:
        return self._functions.get(name)

    def list_tools(self) -> list[str]:
        return list(self._functions.keys())

    async def execute(self, name: str, arguments: dict[str, Any]) -> Any:
        func = self._functions.get(name)
        if not func:
            raise ValueError(f"Unknown tool: {name}")
        logger.info("Executing tool: %s with args: %s", name, arguments)
        return await func(**arguments)


FUNCTION_REGISTRY = ToolRegistry()


def get_function_registry() -> ToolRegistry:
    return FUNCTION_REGISTRY
