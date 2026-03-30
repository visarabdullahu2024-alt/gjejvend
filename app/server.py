#!/usr/bin/env python3
import os
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent
HOST = os.getenv("HOST", os.getenv("DOCTOR_APP_HOST", "127.0.0.1"))
PORT = int(os.getenv("PORT", os.getenv("DOCTOR_APP_PORT", "8000")))


class StaticHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()


def run():
    handler = partial(StaticHandler, directory=str(ROOT))
    server = ThreadingHTTPServer((HOST, PORT), handler)
    print(f"Serving Gjejvend on http://{HOST}:{PORT}")
    server.serve_forever()


if __name__ == "__main__":
    run()
