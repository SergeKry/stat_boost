import pytest
from app.services.expected_values import ExpectedValuesService

@pytest.mark.asyncio
async def test_collect_values_real():
    """Test fetching real expected values from the XVM API"""
    
    # Call the XVM API
    result = await ExpectedValuesService.collect_values()
    
    # Assertions
    assert result is not None  # Ensure the API returned data
    assert isinstance(result, dict)  # Ensure response is a dictionary
    assert "data" in result # Check expected structure