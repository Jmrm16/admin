<?php

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('registration screen is not accessible', function () {
    $response = $this->get('/register');

    $response->assertNotFound();
});
