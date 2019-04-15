require 'test_helper'

class BittrexCsvControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get bittrex_csv_index_url
    assert_response :success
  end

  test "should get import" do
    get bittrex_csv_import_url
    assert_response :success
  end

end
