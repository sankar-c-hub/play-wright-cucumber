Feature: Login functionality feature file

    @test001 @smoke @regression
    Scenario Outline: Verify login with valid credentials on Demo Web Shop
        Given I have access to application
        When I click on login link
        And I enter username as '<username>' and password as '<password>'
        And I click on login submit button
        And I click on user account link for '<username>'
        Then I verify customer info heading is displayed
        When I click on customer info heading
        And I click on logout link
        Then I verify logout is successful

        Examples:
            | SlNo. | page          | username                    | password    | content |
            | 1     | Demo Web Shop | testing12345@mailinator.com | testing@123 | NA      |

    @test002 @regression @negative
    Scenario Outline: Verify login fails with invalid password
        Given I have access to application
        When I click on login link
        And I enter username as '<username>' and password as '<password>'
        And I click on login submit button
        Then I verify login error message '<errorMessage>' is displayed

        Examples:
            | SlNo. | page          | username                    | password       | errorMessage                           |
            | 1     | Demo Web Shop | testing12345@mailinator.com | WrongPassword! | The credentials provided are incorrect |

    @test003 @regression @negative
    Scenario Outline: Verify login fails with unregistered email
        Given I have access to application
        When I click on login link
        And I enter username as '<username>' and password as '<password>'
        And I click on login submit button
        Then I verify login error message '<errorMessage>' is displayed

        Examples:
            | SlNo. | page          | username                       | password        | errorMessage              |
            | 1     | Demo Web Shop | unregistered_demo_987@test.com | TestPassword123 | No customer account found |

    @test004 @regression @negative
    Scenario Outline: Verify validation error on entering invalid email format
        Given I have access to application
        When I click on login link
        And I enter username as '<username>' and password as '<password>'
        And I click on login submit button
        Then I verify email validation error message '<validationMessage>' is displayed

        Examples:
            | SlNo. | page          | username      | password    | validationMessage                   |
            | 1     | Demo Web Shop | invalid-email | testing@123 | Please enter a valid email address. |

    @test005 @regression @negative
    Scenario Outline: Verify login fails with blank credentials
        Given I have access to application
        When I click on login link
        And I click on login submit button
        Then I verify login error message '<errorMessage>' is displayed

        Examples:
            | SlNo. | page          | errorMessage              |
            | 1     | Demo Web Shop | No customer account found |

    @test006 @smoke @regression
    Scenario Outline: Verify login with Remember Me option enabled
        Given I have access to application
        When I click on login link
        And I enter username as '<username>' and password as '<password>'
        And I check remember me checkbox
        And I click on login submit button
        Then I verify user account link is displayed
        When I click on logout link
        Then I verify logout is successful

        Examples:
            | SlNo. | page          | username                    | password    |
            | 1     | Demo Web Shop | testing12345@mailinator.com | testing@123 |
#Total No. of Test Cases : 6


