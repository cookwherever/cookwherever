from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Iterable as _Iterable, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class Ingredient(_message.Message):
    __slots__ = ["name"]
    NAME_FIELD_NUMBER: _ClassVar[int]
    name: str
    def __init__(self, name: _Optional[str] = ...) -> None: ...

class ParseDirectionRequest(_message.Message):
    __slots__ = ["ingredients", "text"]
    INGREDIENTS_FIELD_NUMBER: _ClassVar[int]
    TEXT_FIELD_NUMBER: _ClassVar[int]
    ingredients: _containers.RepeatedCompositeFieldContainer[Ingredient]
    text: str
    def __init__(self, text: _Optional[str] = ..., ingredients: _Optional[_Iterable[_Union[Ingredient, _Mapping]]] = ...) -> None: ...

class ParseDirectionResponse(_message.Message):
    __slots__ = ["amount", "name"]
    AMOUNT_FIELD_NUMBER: _ClassVar[int]
    NAME_FIELD_NUMBER: _ClassVar[int]
    amount: str
    name: str
    def __init__(self, name: _Optional[str] = ..., amount: _Optional[str] = ...) -> None: ...
