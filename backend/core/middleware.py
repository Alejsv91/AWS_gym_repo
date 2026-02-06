import time
from starlette.middleware.base import BaseHTTPMiddleware
from core.logger import logger

class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        start = time.time()

        response = await call_next(request)

        duration = round((time.time() - start) * 1000, 2)

        logger.info({
            "method": request.method,
            "path": request.url.path,
            "status": response.status_code,
            "duration_ms": duration,
            "client_ip": request.client.host
        })

        return response
