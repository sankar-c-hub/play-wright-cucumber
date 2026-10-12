Feature: Product and Price Sorting functionality


    @sort001 @smoke @regression @sorting
    Scenario: Verify available sorting options in product category
        Given I have access to application
        When I click on login link
        And I enter username as 'testing12345@mailinator.com' and password as 'testing@123'
        And I click on login submit button
        Then I verify user account link is displayed
        When I click on 'Books' category link
        Then I verify available sorting options are displayed in the dropdown:
            | Option             |
            | Position           |
            | Name: A to Z       |
            | Name: Z to A       |
            | Price: Low to High |
            | Price: High to Low |
            | Created on         |

    @sort002 @smoke @regression @sorting
    Scenario: Verify product sorting by name from A to Z
        Given I have access to application
        When I click on login link
        And I enter username as 'testing12345@mailinator.com' and password as 'testing@123'
        And I click on login submit button
        Then I verify user account link is displayed
        When I click on 'Books' category link
        And I select sort by option 'Name: A to Z'
        Then I verify the active sort option is 'Name: A to Z'
        And I verify products are sorted by name in 'ascending' order

    @sort003 @regression @sorting
    Scenario: Verify product sorting by name from Z to A
        Given I have access to application
        When I click on login link
        And I enter username as 'testing12345@mailinator.com' and password as 'testing@123'
        And I click on login submit button
        Then I verify user account link is displayed
        When I click on 'Books' category link
        And I select sort by option 'Name: Z to A'
        Then I verify the active sort option is 'Name: Z to A'
        And I verify products are sorted by name in 'descending' order

    @sort004 @smoke @regression @sorting
    Scenario: Verify price sorting from low to high
        Given I have access to application
        When I click on login link
        And I enter username as 'testing12345@mailinator.com' and password as 'testing@123'
        And I click on login submit button
        Then I verify user account link is displayed
        When I click on 'Books' category link
        And I select sort by option 'Price: Low to High'
        Then I verify the active sort option is 'Price: Low to High'
        And I verify products are sorted by price from 'low to high'

    @sort005 @regression @sorting
    Scenario: Verify price sorting from high to low
        Given I have access to application
        When I click on login link
        And I enter username as 'testing12345@mailinator.com' and password as 'testing@123'
        And I click on login submit button
        Then I verify user account link is displayed
        When I click on 'Books' category link
        And I select sort by option 'Price: High to Low'
        Then I verify the active sort option is 'Price: High to Low'
        And I verify products are sorted by price from 'high to low'

    @sort006 @regression @sorting
    Scenario Outline: Verify selecting each available sorting option updates the view
        Given I have access to application
        When I click on login link
        And I enter username as 'testing12345@mailinator.com' and password as 'testing@123'
        And I click on login submit button
        Then I verify user account link is displayed
        When I click on 'Books' category link
        And I select sort by option '<sortOption>'
        Then I verify the active sort option is '<sortOption>'

        Examples:
            | SlNo. | sortOption         |
            | 1     | Position           |
            | 2     | Name: A to Z       |
            | 3     | Name: Z to A       |
            | 4     | Price: Low to High |
            | 5     | Price: High to Low |
            | 6     | Created on         |
