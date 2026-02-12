/*hi there

welcome to da murky waters where we murk our waters
this is made by the system known as: "false-bound"
specifically, this is made by maddison, vozzie, and flanks

[- LIST OF CONTENTS -]
1. CASE MODIFICATIONS
2. COMBAT ACTIONS
3. COMBAT ACTORS (not yet)
4. COMBAT STATUSES
5. HUMORS/AUGMENTS (not yet for HUMORS)
6. IMPULSES (not yet)
7. CSS
8. MISCELLANEOUS (fish exec, item list, etc)
*/

/* CASE MODIFICATIONS */
document.addEventListener('corru_entered', ()=>{
/* COMBAT ACTIONS */
    env.ACTIONS.frenzysurge = {
        slug: "frenzysurge",
        name: "Frenzied Surge",
        type: 'self+autohit+support',
        anim: "",
        usage: {
            act: "%USER IS DYNAMIZED"
        },
        details: {
            onUse: () => `'[STATUS::evasion] [STATUS::frenzysurge]'`,
            flavor: "'charge forward without fear'"
        },

        stats: {
            status: {
                frenzysurge: {
                    name: 'frenzysurge',
                    length: 1
                },
                evasion: {
                    name: 'evasion',
                    length: 1
                },                
            }
        },
        beneficial: true,
        disableIf: (actor)=>{ if(hasStatus(actor,"fear")) return "PROHIBITED BY FEAR" },
        exec: function(user, target) {
            play("talkchoir7", 2)
            addStatus({target: user, status: "frenzysurge", length: 1, noReact: true})
            addStatus({target: user, status: "evasion", length: 1, noReact: true}); 
            return 'nothing'
        }, 

        avoidChaining: true
    },  
    
/* COMBAT STATUSES */
    env.STATUS_EFFECTS.frenzysurge = {
        slug: "frenzysurge",
        name: "Frenzied Surge",
        beneficial: true,
        icon: "https://corru.observer/img/sprites/combat/augs/claw.gif",
        help: "14% chance to use action again\nchance increased by puncture, rot, and open wound (MAX 20%)",
        events: {
            onAction: function({user, action, target}) {
            let chanceBonus = hasStatus(target, "puncture") * 0.01 + hasStatus(target, "open_wound") * 0.02 + hasStatus(target, "rot") * 0.03
            if(Math.random() < (0.14 + chanceBonus))
            setTimeout(()=>useAction(user, action, target, {beingUsedAsync: true, reason: "frenzysurge"}), 400)
            }
        }
    },
    
/* HUMORS/AUGMENTS */
    env.ACTOR_AUGMENTS.generic.frenzysurge = {
        slug: "frenzysurge",
        name: "Frenzied Surge",
        image: "/img/sprites/combat/augs/sacrifice.gif",
        description: "'relentless strikes';'overexert self for major damage'",
        alterations: [["evade", "frenzysurge"]],
        component: ["primary", "claws"],
        cost: 2,
        showIf: ["ClawsEvo", true], //scary
    }
    
/* MISCELLANEOUS */
    env.ITEM_LIST.fish_clawsevo = {
        slug: "fish_clawsevo",
        name: "Claw Sharpener",
        imgClass: "fish",
        image: "https://github.com/C0D3Hermit/Murky-Waters-Modpack/blob/mod/img/fish/clawsevo.gif",
        description: `'discarded surface runner tool';'originally used to climb with bare hands"'`,
        oocnote: "'<strong>PERMANENT</strong>';'select shell';'unlock more augments for CLAWS'",
        type: 'target',
        exec: "fish_clawsevo",
        group: "fish",
        max: 10,
        batches: 1
    },
      
// really hope this works
    env.ITEM_EXEC.fish_clawsevo = (target) => {
        if(!target.alterations) target.alterations = []
        if(target.alterations.find(alteration => alteration[2] == "CLAWS")) {
            chatter({actor: 'sourceless', text: `the shell refuses, as they already have it.`, readout: true, sfx: false})
            return play('muiClick', 2);
        }
        // fear
        target.alterations.push(["ClawsEvo", true, "CLAWS"])
        play('talkchoir', 0.4)
        removeItem(env.ITEM_LIST.fish_clawsevo)
        if(env.crittaMenu) if(env.crittaMenu.style.opacity == 1) toggleCrittaMenu()
    }
})
// da end
