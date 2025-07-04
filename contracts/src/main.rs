use anchor_lang::prelude::*;
// use anchor_lang::Bumps;
use anchor_spl::token::{Token, TokenAccount};

declare_id!("3gfMFWRXqEqCEawUv7R2ZYwAmCHCppFkrwn6r5xYWchL");

#[program]
pub mod whitelist {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let platform_config = &mut ctx.accounts.platform_config;
        platform_config.authority = ctx.accounts.authority.key();
        platform_config.is_initialized = true;
        Ok(())
    }

    // This function deals with adding users to the contract
    // users that can send messages
    pub fn add_user_to_whitelist(
        ctx: Context<AddUser>,
        user: Pubkey,
    ) -> Result<()> {

        require!(ctx.accounts.platform_config.is_initialized, ErrorCode::NotInitialized);
        require!(ctx.accounts.platform_config.authority == ctx.accounts.authority.key(), ErrorCode::Unauthorized);

        // Checking if the user already exists in the whitelist
        let whitelist = &mut ctx.accounts.whitelist;

        // Checking if the user is NOT already in the whitelist
        require!(!whitelist.users.contains(&user), ErrorCode::UserAlreadyInWhitelist);

        // Add the user to the whitelist
        whitelist.add_user(user);
        
        Ok(())
    }

    pub fn remove_user_from_whitelist(
        ctx: Context<RemoveUser>,
        user: Pubkey,
    ) -> Result<()> {
        let whitelist = &mut ctx.accounts.whitelist;
        
        require!(whitelist.is_initialized, ErrorCode::NotInitialized);
        require!(whitelist.authority == ctx.accounts.authority.key(), ErrorCode::Unauthorized);
        
        // Check if user is in whitelist before removing
        require!(whitelist.users.contains(&user), ErrorCode::UserNotInWhitelist);

        // Remove the whitelisted user
        whitelist.remove_user(user);
        
        Ok(())
    }

    pub fn send_message(ctx: Context<SendMessage>, message: String) -> Result<bool> {
        let whitelist = &mut ctx.accounts.whitelist;
        require!(whitelist.is_initialized, ErrorCode::NotInitialized);
        require!(whitelist.users.contains(&ctx.accounts.authority.key()), ErrorCode::Unauthorized);
        
        // Send the message to the whitelist
        whitelist.send_message(message);
        
        Ok(true)
    }

    pub fn view_whitelist(ctx: Context<ViewWhitelist>) -> Result<()> {
        // Anybody should be able to view the whitelist so they can see if they are able to send messages
        require!(ctx.accounts.platform_config.is_initialized, ErrorCode::NotInitialized);
        let _whitelist = &ctx.accounts.whitelist;
        Ok(())
    }

    pub fn is_user_in_whitelist(ctx: Context<IsUserInWhitelist>, user: Pubkey) -> Result<bool> {
        require!(ctx.accounts.platform_config.is_initialized, ErrorCode::NotInitialized);
        let whitelist = &ctx.accounts.whitelist;
        Ok(whitelist.users.contains(&user))
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 1 + 32, // discriminator + authority + is_initialized + whitelist pubkey
        seeds = [b"platform_config".as_ref()],
        bump
    )]
    pub platform_config: Account<'info, PlatformConfig>,
    
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AddUser<'info> {
    #[account(
        seeds = [b"platform_config".as_ref()],
        bump
    )]
    pub platform_config: Account<'info, PlatformConfig>,
    
    #[account(
        init,
        payer = authority,
        space = 8 + 4 + (32 * 100) + 1 + 32 + 4 + (4 + 200) * 50, // discriminator + users vec + is_initialized + authority + messages vec
        seeds = [b"whitelist".as_ref()],
        bump
    )]
    pub whitelist: Account<'info, Whitelist>,
    
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct RemoveUser<'info> {
    #[account(mut)]
    pub whitelist: Account<'info, Whitelist>,
    
    #[account(mut)]
    pub authority: Signer<'info>,    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SendMessage<'info> {
    #[account(mut)]
    pub whitelist: Account<'info, Whitelist>,
    
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ViewWhitelist<'info> {
    #[account(
        seeds = [b"platform_config".as_ref()],
        bump
    )]
    pub platform_config: Account<'info, PlatformConfig>,
    
    #[account(
        seeds = [b"whitelist".as_ref()],
        bump
    )]
    pub whitelist: Account<'info, Whitelist>,
}

#[derive(Accounts)]
pub struct IsUserInWhitelist<'info> {
    #[account(
        seeds = [b"platform_config".as_ref()],
        bump
    )]
    pub platform_config: Account<'info, PlatformConfig>,
    
    #[account(
        seeds = [b"whitelist".as_ref()],
        bump
    )]
    pub whitelist: Account<'info, Whitelist>,
}

#[account]
pub struct PlatformConfig {
    pub authority: Pubkey,
    pub is_initialized: bool,
    pub whitelist: Pubkey,
}

#[account]
pub struct Whitelist {
    pub users: Vec<Pubkey>,
    pub is_initialized: bool,
    pub authority: Pubkey,
    pub messages: Vec<String>,
}

impl Whitelist {
    pub fn add_user(&mut self, user: Pubkey) {
        self.users.push(user);
        if !self.is_initialized {
            self.is_initialized = true;
        }
    }
    
    pub fn remove_user(&mut self, user: Pubkey) {
        self.users.retain(|&x| x != user);
    }
    
    pub fn send_message(&mut self, message: String) {
        self.messages.push(message);
    }
}

#[error_code]
pub enum ErrorCode {
    #[msg("You are not authorized to perform this action")]
    Unauthorized,
    
    #[msg("Not initialized")]
    NotInitialized,
    
    #[msg("User already in whitelist")]
    UserAlreadyInWhitelist,
    
    #[msg("User not in whitelist")]
    UserNotInWhitelist,
}
