/*hi there

welcome to da murky waters where we murk our waters
this is made by the system known as: "false-bound"
specifically, this is made by maddison, vozzie, and flanks

theres not a list currently but i will make one when i have time
*/

document.addEventListener('corru_entered', ()=>{
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
