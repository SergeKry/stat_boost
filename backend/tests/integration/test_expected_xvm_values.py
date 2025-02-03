import pytest
from services.expected_values import ExpectedValuesService

@pytest.mark.asyncio
async def test_collect_xvm_values():
    """Test fetching real expected values from the XVM API"""
    
    # Call the XVM API
    result = await ExpectedValuesService().collect_xvm_values()
    
    # Assertions
    assert result is not None
    assert isinstance(result, dict)
    assert "data" in result # Check expected structure

@pytest.mark.asyncio
async def test_collect_wg_tanks():
    """Test that WG API for fetching all tanks work properly."""

    result = await ExpectedValuesService().get_all_tanks()

    assert result is not None
    assert isinstance(result, dict)
    assert len(result) > 0