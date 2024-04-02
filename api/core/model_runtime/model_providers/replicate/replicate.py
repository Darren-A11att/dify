import logging
from typing import Any

from httpx import Timeout
from replicate import Client as ReplicateClient

from core.model_runtime.model_providers.__base.model_provider import ModelProvider

logger = logging.getLogger(__name__)


class ReplicateProvider(ModelProvider):

    def validate_provider_credentials(self, credentials: dict) -> None:
        pass

    @staticmethod
    def get_client(credentials: dict = None, **kwargs: Any) -> ReplicateClient:
        client = ReplicateClient(
            api_token=credentials['replicate_api_token'],
            timeout=Timeout(30),
        )
        return client
