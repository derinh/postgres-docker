from fastapi import APIRouter, Depends
from ..deps import get_current_user
from ..schemas import UserOut
from ..models import User


router = APIRouter(prefix="/users", tags=["users"])


@router.get("/me", response_model=UserOut)
def me(current: User = Depends(get_current_user)):
    return current
