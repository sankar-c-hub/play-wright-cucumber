Feature: Login functionality feature file

    @test001 @smoke @regression
    Scenario Outline: Verify login with valid credentials1
        Given I have access to application
        When I click on birth pop up close button if displayed verify
        And I click on login icon
        And I click on login button
        And I click on login with email button
        And I enter username as '<username>' and password as '<password>'

        Examples:
            | SlNo. | page          | content |
            | 1     | Demo Web Shop | NA      |

    @test002 @smoke @regression
    Scenario Outline: Verify login with valid credentials2
        Given I have access to application
        When I click on birth pop up close button if displayed verify
        And I click on login icon
        And I click on login button
        And I click on login with email button
        And I enter username as '<username>' and password as '<password>'

        Examples:
            | SlNo. | page          | content |
            | 1     | Demo Web Shop | NA      |
#Total No. of Test Cases : 1

