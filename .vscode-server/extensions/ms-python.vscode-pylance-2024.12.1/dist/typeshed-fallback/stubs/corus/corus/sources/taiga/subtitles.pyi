from _typeshed import Incomplete
from collections.abc import Generator

def parse_metas(items) -> Generator[Incomplete]: ...
def load_taiga_subtitles_metas(path, offset: int = 0, count: int = 1): ...
def load_taiga_subtitles(path, metas: Incomplete | None = None, offset: int = 2113024, count: int = 19011): ...